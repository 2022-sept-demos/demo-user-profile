// this will: check we have a user, set signout link, fetch user profile
import '../auth/user.js';
import { getUser, getProfiles } from '../fetch-utils.js';
import { renderProfile } from '../render-utils.js';

const profileList = document.getElementById('profile-list');

let error = null;
let profiles = [];

window.addEventListener('load', async () => {
    const response = await getProfiles();
    error = response.error;
    profiles = response.data;

    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }

    if (profiles) {
        displayProfiles();
    }
});

async function displayProfiles() {
    const user = getUser();
    for (const profile of profiles) {
        const profileEl = renderProfile(profile, user.id);
        profileList.append(profileEl);
    }
}
