const G = 6.674e-11;
const c = 3e8;
const solarMass = 1.989e30;

function schwarzschildRadius(massInSolar) {
  const mass = massInSolar * solarMass;
  return (2 * G * mass) / (c * c);
}

function timeDilation(distance, rs) {
  if (distance <= rs) return 0;
  return Math.sqrt(1 - rs / distance);
}
