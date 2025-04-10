# Managing Packages With npm

This is the boilerplate code for the Managing Packages With npm Challenges. Instructions for working on these challenges start at https://www.freecodecamp.org/learn/back-end-development-and-apis/managing-packages-with-npm/

#### semantic versioning: 
    "MAJOR.MINOR.PATCH"
    MAJOR: New features/changes that wont work with older versions [breaking changes]
    MINOR: New features that are backward compatibe.
    PATCH: Bug fixes that are backward compatible.
    "*MAJOR.MINOR.PATCH"
    *:
        ~: install latest patch version eg: "~1.0.3" [even future patches will be installed]
        ^: install latest MINOR version eg "^1.1.3" [even future minor releases will be installed]