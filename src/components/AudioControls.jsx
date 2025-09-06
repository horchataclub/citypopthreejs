import * as Tone from "tone";
import "./AudioControls.scss";
import { Application } from "@splinetool/runtime";
import { useEffect, useRef, useState } from "react";

export default function AudioControls() {
  const canvasRef = useRef(null);
  const splineAppRef = useRef(null);
  const playerRef = useRef(null);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  // Initialize audio when component mounts
  useEffect(() => {
    console.log("Initializing audio...");

    // Create player with better error handling
    const player = new Tone.Player({
      url: "/audio/AkariDream.wav",
      loop: true,
      mute: false,
      onload: () => {
        console.log("Audio file loaded successfully!");
        setIsAudioLoaded(true);
      },
      onerror: (error) => {
        console.error("Error loading audio file:", error);
        console.error("Make sure the file exists at: /audio/AkariDream.wav");
        // Try alternative loading approach
        console.log("Trying alternative loading...");
        player
          .load("/audio/AkariDream.wav")
          .then(() => {
            console.log("Alternative loading successful");
            setIsAudioLoaded(true);
          })
          .catch((err) => {
            console.error("Alternative loading failed:", err);
          });
      },
    }).toDestination();

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  // Play function
  const playBtn = async () => {
    const player = playerRef.current;
    console.log(
      "playBtn called, isAudioLoaded:",
      isAudioLoaded,
      "player exists:",
      !!player
    );

    if (!player) {
      console.error("Player not initialized yet");
      return;
    }

    try {
      // Ensure Tone.js context is started
      if (Tone.context.state !== "running") {
        console.log("Starting Tone context...");
        await Tone.start();
      }

      console.log("Player state:", {
        loaded: player.loaded,
        state: player.state,
        buffer: !!player.buffer,
      });

      if (player.state === "started") {
        console.log("Audio is already playing");
        return;
      }

      // Try to start the player
      player.start();
      console.log("Audio started successfully");
    } catch (error) {
      console.error("Error in playBtn:", error);

      // If direct start fails, try loading first
      if (!player.loaded) {
        console.log("Attempting to load audio first...");
        try {
          await player.load("/audio/AkariDream.wav");
          player.start();
          console.log("Audio loaded and started");
        } catch (loadError) {
          console.error("Failed to load and start audio:", loadError);
        }
      }
    }
  };

  // Mute function
  const muteBtn = () => {
    const player = playerRef.current;
    if (!player) {
      console.warn("Player not initialized yet");
      return;
    }

    if (player.mute === false) {
      player.mute = true;
      const muteEl = document.getElementById("mute");
      if (muteEl) muteEl.innerHTML = "Sound On";
    } else if (player.mute === true) {
      player.mute = false;
      const muteEl = document.getElementById("mute");
      if (muteEl) muteEl.innerHTML = "Sound Off";
    }
    console.log("Mute toggled, muted:", player.mute);
  };

  // Initialize Spline
  useEffect(() => {
    if (canvasRef.current) {
      console.log("Initializing Spline app...");
      const app = new Application(canvasRef.current);
      splineAppRef.current = app;

      // Add a general click listener to the canvas as backup
      const canvas = canvasRef.current;
      canvas.addEventListener("click", (e) => {
        console.log("Canvas clicked (backup method)");
        playBtn();
      });

      app
        .load("https://prod.spline.design/bKqHQfBoIUJKRAPl/scene.splinecode")
        .then(() => {
          console.log("Spline scene loaded successfully");

          // Try multiple event types
          const eventTypes = [
            "mouseDown",
            "mouseUp",
            "click",
            "pointerdown",
            "pointerup",
          ];

          eventTypes.forEach((eventType) => {
            app.addEventListener(eventType, (e) => {
              console.log(`${eventType} event:`, {
                target: e.target,
                targetName: e.target?.name,
                targetId: e.target?.id,
                targetUuid: e.target?.uuid,
              });

              // Only check for specific object names - be more selective
              if (e.target) {
                const targetName = e.target.name?.toLowerCase();

                // Only respond to very specific names
                if (
                  targetName === "powerbtn-target" ||
                  targetName === "power-button" ||
                  targetName === "play-button"
                ) {
                  console.log(
                    "Specific target button clicked! Calling playBtn()"
                  );
                  playBtn();
                } else if (targetName) {
                  // Log other clicked objects for debugging
                  console.log(
                    `Clicked object "${targetName}" - not triggering audio`
                  );
                }
              }
            });
          });

          // Try to find the specific object directly and add event listener
          setTimeout(() => {
            try {
              const powerButton = app.findObjectByName("powerbtn-target");
              if (powerButton) {
                console.log("Found powerbtn-target object:", powerButton);

                // Add event listener directly to the object
                const eventTypes = ["mouseDown", "click"];
                eventTypes.forEach((eventType) => {
                  powerButton.addEventListener(eventType, (e) => {
                    console.log(
                      `Direct object ${eventType} on powerbtn-target!`
                    );
                    e.stopPropagation(); // Prevent event bubbling
                    playBtn();
                  });
                });
              } else {
                console.warn(
                  'Could not find object with name "powerbtn-target"'
                );
              }
            } catch (error) {
              console.error("Error finding specific object:", error);
            }
          }, 1000); // Give Spline time to fully load

          // Log all available objects for debugging
          setTimeout(() => {
            try {
              const scene = app.scene;
              if (scene) {
                console.log("Spline scene objects:", scene);
                // Try to traverse and log all objects
                const logObjects = (obj, depth = 0) => {
                  const indent = "  ".repeat(depth);
                  console.log(`${indent}Object:`, {
                    name: obj.name,
                    id: obj.id,
                    uuid: obj.uuid,
                    type: obj.type,
                  });
                  if (obj.children) {
                    obj.children.forEach((child) =>
                      logObjects(child, depth + 1)
                    );
                  }
                };
                if (scene.children) {
                  scene.children.forEach((child) => logObjects(child));
                }
              }
            } catch (error) {
              console.log("Could not traverse scene objects:", error);
            }
          }, 2000);
        })
        .catch((error) => {
          console.error("Error loading Spline scene:", error);
        });
    }

    // Cleanup function
    return () => {
      if (splineAppRef.current) {
        splineAppRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="audioControls">
      <canvas ref={canvasRef} id="spline-canvas" />
    </div>
  );
}
