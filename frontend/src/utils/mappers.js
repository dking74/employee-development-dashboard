import { achievementObjectMapping } from './constants';

export const mapObjectToForm = (object, objectMapping) => {
  return Object.keys(objectMapping).reduce((prev, curr) => {
    if (object[curr] && objectMapping[curr]) {
      prev[curr] = object[curr];
    }

    return prev;
  }, {});
};

export const mapObjectToFormDataEdit = (formData, object, objectMapping) => {
  const mappedObject = mapObjectToForm(object, objectMapping);
  return formData.map(formObj => {
    return { ...formObj, value: mappedObject[formObj.name] };
  });
};

export const mapAchievementToForm = (formData, object) => {
  return mapObjectToFormDataEdit(formData, object, achievementObjectMapping);
};