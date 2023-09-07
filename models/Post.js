// Import necessary modules and initialize the Sequelize model and connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Comment = require('./Comment');

class Post extends Model {}

// Initialize the Post model with its fields and configurations
Post.init(
  {
    // 'id' is the primary key for Post, auto-incremented integer
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // 'name' stores the name of the post as a string
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 'description' stores a description of the post as a string
    description: {
      type: DataTypes.STRING,
    },
    // 'date_created' stores the creation date of the post as a date
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // 'user_id' is a foreign key referencing the 'user' model's 'id' field
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,           
    timestamps: false,    
    freezeTableName: true, 
    underscored: true, 
    modelName: 'post',    
  }
);

// Define the association between Post and Comment models
Post.hasMany(Comment, {
  foreignKey: 'post_id', // The foreign key in the Comment model that links to Post
  onDelete: 'CASCADE',   
});

// Export the Post model
module.exports = Post;
