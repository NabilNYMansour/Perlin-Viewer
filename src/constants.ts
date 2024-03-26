import { Vector3 } from "three";

export const DEFUALT_SETTINGS = {
    size: 10,
    segments: 60,
    wireframeMode: true,
    noiseLod: 3,
    noiseOffset: 0,
    colors: [new Vector3(0.243, 0.44, 1), new Vector3(0, 1, 0.8)]
}

export const LINKS = {
    personalWebsite: 'https://nabilmansour.com/',
    githubRepo: 'https://github.com/NabilNYMansour/Perlin-Viewer',
    wiki: 'https://en.wikipedia.org/wiki/Perlin_noise'
}

export const FOOTER_SCENE_BUTTONS_SYLE = {
    fontFamily: 'Caviar-Dreams',
    textTransform: 'none',
    fontSize: '1em',
    display: 'flex',
    gap: "10%"
}