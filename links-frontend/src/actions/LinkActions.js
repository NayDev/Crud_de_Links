import {apiPost} from '../helpers/api';

export const LINK_CREATE = 'LINKS_CREATE';

export const linkCreate = (data) => {

    const isSocial = !!data.isSocial; //Tranformando em BOOLEAN

    const payload = apiPost('/link', {...data, isSocial});

    return {type: LINK_CREATE, payload};
};

