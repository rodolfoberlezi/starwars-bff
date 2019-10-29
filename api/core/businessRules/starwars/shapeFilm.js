module.exports = (data) => {
  const episode = {
    title: data.title,
    release_date: data.release_date,
    episode_id: data.episode_id,
    opening_crawl: data.opening_crawl,
    characters: [],
    planets: []
  }
  return episode
}