import { achievementObjectMapping, eventObjectMapping, goalObjectMapping, certificationObjectMapping } from './constants';

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
    return { ...formObj, value: mappedObject[formObj.name] || '' };
  });
};

export const mapChildrenElements = (topLevelMap, object) => {
  return topLevelMap.map(topLevel => 
    (topLevel.children) 
      ? {
        ...topLevel,
        children: topLevel.children.map(child => ({
          ...child, value: object[child.name]
        }))
      }: topLevel
  );
}

export const mapAchievementToForm = (formData, object) => {
  return mapObjectToFormDataEdit(formData, object, achievementObjectMapping);
};

export const mapEventToForm = (formData, object) => {
  return mapObjectToFormDataEdit(formData, object, eventObjectMapping);
};

export const mapGoalToForm = (formData, object) => {
  const topLevelMap = mapObjectToFormDataEdit(formData, object, goalObjectMapping);
  return mapChildrenElements(topLevelMap, object);
};

export const mapCertificationToForm = (formData, object) => {
  const modifiedForm = formData.map((curr) => {
    if (curr.name === 'files') {
      curr.name = 'attachment_url';
      curr.type = 'image';
      curr.props = { src: object.attachment_url, width: '300px', height: '200px' };
      curr.value = '';
      curr.listeners = { click: () => window.open(object.attachment_url) }
    }
    return curr;
  });
  return mapObjectToFormDataEdit(modifiedForm, object, certificationObjectMapping);
};