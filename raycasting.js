
function drawBoundaries() {
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    boundaries.forEach(boundary => {
        ctx.beginPath();
        ctx.moveTo(boundary.x1, boundary.y1);
        ctx.lineTo(boundary.x2, boundary.y2);
        ctx.stroke();
    });
    ctx.restore();
    return;
}
function rayIntersectLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) {
      return null; // Lines are parallel
    }
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t >= 0 && u >= 0 && u <= 1) {
      return {
        x: x1 + t * (x2 - x1),
        y: y1 + t * (y2 - y1),
      };
    }
    return null;
  }
  
  // Draw 1000 rays within a 45-degree FOV
function drawRays() {
    const fovAngle = Math.PI * 2; // 45 degrees in radians
    const numRays = 5000; // Number of rays to cast
    const rayLength = 2000; // Arbitrary large value for initial raycasting
  
    // Clear the canvas
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw rays
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
  
    for (let i = 0; i < numRays; i++) {
      // Calculate the angle of the current ray
      const angle =
        sprite.direction - fovAngle / 2 + (i / (numRays - 1)) * fovAngle;
  

  
      // Find the closest intersection with boundaries
      let closestIntersection = null;
      let closestDistance = rayLength;
    
      const spriteCenterX = sprite.x + spriteSize / 2;
      const spriteCenterY = sprite.y + spriteSize / 2;

    // Calculate the end point of the ray (before intersection)
    const rayEndX = spriteCenterX + Math.cos(angle) * rayLength;
    const rayEndY = spriteCenterY + Math.sin(angle) * rayLength;
      boundaries.forEach((boundary) => {
        const intersection = rayIntersectLine(
          spriteCenterX,
          spriteCenterY,
          rayEndX,
          rayEndY,
          boundary.x1,
          boundary.y1,
          boundary.x2,
          boundary.y2
        );
  
        if (intersection) {
          const distance = Math.sqrt(
            (intersection.x - sprite.x) ** 2 + (intersection.y - sprite.y) ** 2
          );
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIntersection = intersection;
          }
        }
      });
  
      // Draw the ray
      ctx.beginPath();
      ctx.moveTo(spriteCenterX, spriteCenterY);
      if (closestIntersection) {
         ctx.lineTo(closestIntersection.x, closestIntersection.y);
      } else {
        ctx.lineTo(rayEndX, rayEndY);
    }
       ctx.stroke();
    }
  }
  