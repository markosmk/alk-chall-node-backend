const applyExtraOptions = (sequelize) => {
  const { Movie, Character, Gender } = sequelize.models;

  // Relation N to N
  Character.belongsToMany(Movie, { through: 'Character_Movie', timestamps: false });
  Movie.belongsToMany(Character, { through: 'Character_Movie', timestamps: false });

  // Relation One to Many
  Gender.hasMany(Movie);
  Movie.belongsTo(Gender);
};

module.exports = { applyExtraOptions };
