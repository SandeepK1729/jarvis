// The type of release is determined by the commit type.
const releaseRules = [
  { type: 'build', release: 'patch' },
  { type: 'chore', release: 'patch' },
  { type: 'perf', release: 'patch' },
  { type: 'refactor', release: 'patch' },
  { type: 'style', release: 'patch' },
];

// Commit categories and their corresponding sections in the release notes.
// The `hidden` property indicates whether the section should be included in the release notes.
const releseNotesTypes = [
  { type: 'feat', section: 'Features' },
  { type: 'fix', section: 'Bug Fixes' },
  { type: 'build', section: 'Other Changes', hidden: false },
  { type: 'chore', section: 'Other Changes', hidden: false },
  { type: 'docs', section: 'Other Changes', hidden: false },
  { type: 'perf', section: 'Other Changes' },
  { type: 'refactor', section: 'Other Changes', hidden: false },
  { type: 'style', section: 'Other Changes', hidden: false },
  { type: 'ci', section: 'CI', hidden: false },
];

const config = {
  branches: ['main'],
  plugins: [
    [
      // This plugin is responsible for analyzing the commit messages and determining the type of release to be made.
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits', // using the conventionalcommits preset, default is angular
        releaseRules,
      },
    ],
    [
      /**
       * This plugin is responsible for generating the release notes based on the commit messages.
       * The generated notest will be used by
       * - the `@semantic-release/github` plugin to create a release on GitHub.
       * - the `@semantic-release/changelog` plugin to update the `CHANGELOG.md` file.
       */
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: releseNotesTypes,
        },
      },
    ],
    [
      // This plugin is responsible for updating the `CHANGELOG.md` file with the release notes.
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    // This plugin is responsible for publishing the package to npm.
    '@semantic-release/npm',
    [
      // This plugin is responsible for committing the changes made by the previous plugins.
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
        message:
          'chore(release): :rocket: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    // This plugin is resposible for creating Github releases and update included PR's with the release information.
    '@semantic-release/github',
  ],
};

export default config;
