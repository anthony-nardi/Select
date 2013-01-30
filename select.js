var select = function (selector) {
  
  var selected = [],
      and = false,
      or  = false,
      that = this,
      entityCount = that.length;
      
  var andIterator = function (group, selector) {
    var groupCount = group.length,
        selectorCount = selector.length,
        intersect = 0;
    for (var i = 0; i < groupCount; i += 1) {
      for (var j = 0; j < selectorCount; j += 1) {
        if (group[i][selector[j]]) {
          intersect += 1;
        }
      }
      if (intersect === selector.length) {
        selected.push(group[i]);
      }
      intersect = 0;
    }
    return selected;
  };
  
  var orIterator = function (group, selector) {
    var groupCount = group.length,
        selectorCount = selector.length;
    for (var i = 0; i < groupCount; i += 1) {
      for (var j = 0; j < selectorCount; j += 1) {
        if (group[i][selector[j]]) {
          selected.push(group[i]);
          j = selectorCount;
        }
      }
    }
    return selected;
  };
  
  var iterator = function (group, selector) {
    var groupCount = group.length;
    for (var i = 0; i < groupCount; i += 1) {
      if (group[i][selector]) {
        selected.push(group[i]);
      }
    }
    return selected;
  };

  if (entityCount && typeof selector === "string") {
    
    if (selector === "*") {
  
      return (function () {
        for (var i = 0; i < entityCount; i += 1) {
          selected.push(that[i]);
        }
        return selected;
      }());
  
    }

    if (selector.indexOf(",") !== -1) {
        or = true;
        selector = selector.replace(/\s/g,"").split(",");
    } else if (selector.indexOf(" ") !== -1) {
        and = true;
        selector = selector.split(/\s+/);
    }

    return !or && !and ? iterator(that, selector) : !or && and ? andIterator(that, selector) : orIterator(that, selector);
  
  }

};

if (!Array.prototype.select) { Array.prototype.select = select }