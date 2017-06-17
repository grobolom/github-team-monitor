const statuses = {
  cr: {
    'ready for review': 'ready',
    'needs peer review': 'ready',
    'in peer review': 'in-progress',
    'peer review': 'in-progress',
    'code review pass': 'pass',
  },
  qa: {
    'ready for qa': 'ready',
    'needs qa': 'ready',
    'in testing by qa': 'in-progress',
    'testing complete': 'pass',
  },
  fr: {
    'ready for feature review': 'ready',
    'needs feature review': 'ready',
    'in feature review': 'in-progress',
    'feature review passed': 'pass',
  },
  merge: {
    'requires unmerged dependency in other repo': 'dependency',
    'ready to merge': 'ready',
  },
  unaddressed: {
    'has unaddressed comments': 'comments',
  },
}

/**
 * Gets the front-end-usable status for a particular category and label set. Ex:
 * A label of 'ready for qa' in the 'qa' category will return 'ready'
 * 
 * @param {*} type 
 * @param {*} labels 
 */
function getStatus(type, labels) {
  const names = labels.map(function(label) {
    return label.name.toLowerCase();
  })

  const found = Object.keys(statuses[type]).find(function(label) {
    return names.includes(label);
  });

  return found ? statuses[type][found] : 'hidden';
}

export { statuses, getStatus }