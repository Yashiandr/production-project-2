module.exports = {
    chromeSelector: 'body > *, #root > *, #storybook-root > *',
    configurations: {
        'chrome.laptop': {
            target: 'chrome.docker',
            width: 1366,
            height: 768,
        },
        'chrome.iphone7': {
            target: 'chrome.docker',
            preset: 'iPhone 7',
        },
    },
};
