module.exports = (data) => {
  const planet = {
    name: data.name,
    climate: data.climate,
    gravity: data.gravity,
    terrain: data.terrain,
    population: data.population
  }
  return planet
}