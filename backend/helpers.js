//generate query string for updating inventory_items
module.exports = {
  genererateQuery: function (id, type) {
    let query =
      'UPDATE IHQ.inventory_items SET current_location="' + type + '" WHERE ';

    for (let i = 0; i < id.length; i++) {
      query += "item_id = " + id[i].toString();
      if (i < id.length && id.length != 0) query += " or ";
      if (i === id.length - 1 && i !== 0) {
        query += "item_id = " + id[i].toString() + ";";
      }
    }
    return query;
  },
  pad: function (num, size) {
    //helper to pad 0's in front of smaller ID's
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  },
};
