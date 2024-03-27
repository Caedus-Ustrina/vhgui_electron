const buildInformation = {};

// Pass in an id to an ability or talent along with the change in level to have the build data updated.
export function StoreSkillInfo(skillId, specializationId, level){
    if(!buildInformation[skillId]){
        buildInformation[skillId] = {
            name : skillId,
            specialization : specializationId,
            level : level,
            isAbility : true,
        };
    } else {
        buildInformation[skillId].specialization = specializationId;
    }
}

export function InitializeBuildInfo(skillId, specializationId, level, isAbility){
    if(!buildInformation[skillId]){
        buildInformation[skillId] = {
            name : skillId,
            specialization : specializationId,
            level : level,
            isAbility : isAbility,
        };
    }
}

export function StoreTalentInfo(talentId, level){
    if(!buildInformation[talentId]){
        buildInformation[talentId] = {
            name : talentId,
            specialization : '',
            level : level,
            isAbility : false,
        };
    } else {
        buildInformation[skillId].specialization = specializationId;
    }
}

export function StoreLevelInfo(skillId, changeInLevel, isAbility){
    if(!buildInformation[skillId]){
        buildInformation[skillId] = {
            name : skillId,
            specialization : '',
            level : changeInLevel,
            isAbility : isAbility,
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

export function ReadFullBuild(){
    return buildInformation;
}