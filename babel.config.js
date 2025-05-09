module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        // Garder uniquement les plugins nécessaires qui ne sont pas liés aux variables d'environnement
      ]
    };
  };