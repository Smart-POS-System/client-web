import React from "react";
import { motion } from "framer-motion";

function AnimatedGraph() {
  // Inline styles for container and image
  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "800px", // Adjust the height as necessary
  };

  const imageStyles = {
    width: "700px", // Control the size of the image
    maxWidth: "100%", // Ensures the image is responsive
  };

  return (
    <div style={containerStyles}>
      {/* Rotating Graph Image Horizontally */}
      <motion.img
        src="/graph.png" // Ensure this is the correct path to your image
        alt="Rotating Graph"
        style={imageStyles}
        initial={{ rotateY: 0 }} // Initial state of the rotation around Y-axis
        animate={{ rotateY: 360 }} // Rotate around Y-axis to 360 degrees
        transition={{
          duration: 60, // Duration for a complete rotation
          ease: "linear", // Linear animation for smooth continuous rotation
          repeat: Infinity, // Repeat the animation forever
          repeatType: "loop", // Ensure the animation loops smoothly
        }}
      />
    </div>
  );
}

export default AnimatedGraph;
