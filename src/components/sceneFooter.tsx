import { Button } from "@mui/material";
import { FOOTER_SCENE_BUTTONS_SYLE, LINKS } from "../constants";
import GitHubIcon from '@mui/icons-material/GitHub';

export const SceneFooter = () => {
    return <footer className='sceneFooter'>
        <div className='sceneButtons'>
            <Button sx={FOOTER_SCENE_BUTTONS_SYLE} color="inherit" size='large'
                href={LINKS.githubRepo} target="_blank" rel="noreferrer"
            >
                <GitHubIcon fontSize='large' />
                GitHub
            </Button> &nbsp;|
            <Button sx={FOOTER_SCENE_BUTTONS_SYLE} color="inherit" size='large'
                href={LINKS.personalWebsite} target="_blank" rel="noreferrer"
            >
                Developer
            </Button>
        </div>
        Website Made with MUI, R3F and React
    </footer>
}

export default SceneFooter;
