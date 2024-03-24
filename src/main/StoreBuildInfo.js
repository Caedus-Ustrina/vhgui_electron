const buildInformation = {};

// Pass in an id to an ability or talent along with the change in level to have the build data updated.
export function StoreSkillInfo(skillId, specializationId, level){
    if(!buildInformation[skillId]){
        buildInformation[skillId] = {
            name : skillId,
            specialization : specializationId,
            level : level,
        };
    } else {
        buildInformation[skillId].specialization = specializationId;
    }
}

export function StoreTalentInfo(talentId, level){
    if(!buildInformation[talentId]){
        buildInformation[talentId] = {
            name : talentId,
            specialization : '',
            level : level,
        };
    } else {
        buildInformation[skillId].specialization = specializationId;
    }
}

export function StoreLevelInfo(skillId, changeInLevel){
    if(!buildInformation[skillId]){
        buildInformation[skillId] = {
            name : skillId,
            specialization : '',
            level : changeInLevel,
        };
    } else {
        buildInformation[skillId].level += changeInLevel;
    }
}

// Return the specialization selected for the skill id that was given.
export function ReadBuildInfo(skillId){
    if(!buildInformation[skillId]){
        return {
            name : skillId,
            specialization : "",
            level : 0,
        };
    } else {
        return buildInformation[skillId];
    }
}