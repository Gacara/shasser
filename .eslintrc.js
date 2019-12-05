module.exports = {
  "extends": "airbnb",
  "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "linebreak-style": 0,
      "jsx-a11y/label-has-for": [ 2, {
        "required": {
            "every": [ "id" ]
        }
    }]
}
};