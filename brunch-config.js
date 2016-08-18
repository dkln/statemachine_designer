exports.config = {
  files: {
    javascripts: {
      joinTo: {
        "js/statemachine_designer.js": /^src\/js/
      }
    },
    stylesheets: {
      joinTo: {
        "css/statemachine_designer.css": /^src\/css/
      }
    }
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to "/web/static/assets". Files in this directory
    // will be copied to `paths.public`, which is "priv/static" by default.
    assets: /^src\/assets/
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: [
      "src"
    ],

    // Where to compile files to
    public: "dist"
  },

  // Configure your plugins
  plugins: {
    babel: {
      presets: [ "react", "es2015", "es2016" ]
    }
  },

  modules: {
    wrapper: false,
    definition: false
  },

  npm: {
    enabled: false
  }
};
