const { Model } = require("sequelize");

function getLastPage(total, pageSize) {
  const last = pageSize && pageSize != 0 ? total / pageSize : 1;
  return Math.floor(last) === last ? last : Math.floor(last) + 1;
}

class BaseModel extends Model {
  static async paginate({ transform, page = 1, pageSize, ...query }) {
    const limit = parseInt(pageSize) || null;

    const options = {
      ...query,
      ...(limit && { offset: (page - 1) * limit, limit }),
      distinct: true,
      col: "id",
    };

    let { count, rows } = await this.findAndCountAll(options);

    if (transform && typeof transform === "function") {
      rows = await transform(rows);
    }

    return {
      total: count,
      lastPage: getLastPage(count, limit),
      page: parseInt(page),
      pageSize: limit || count,
      data: rows,
    };
  }

  static safeCreate({ values, ...options }) {
    const fields = Object.keys(values);
    if (fields.length < 1) return;
    return super.create(values, { fields, ...options });
  }

  static safeUpdate({ values, ...options }) {
    const fields = Object.keys(values);
    if (fields.length < 1) return;
    return super.update(values, { fields, ...options });
  }

  static safeBulkCreate({ values, ...options }) {
    if (values?.length < 1) return;
    const fields = Object.keys(values[0]);
    if (fields.length < 1) return;
    return super.bulkCreate(values, { fields, ...options });
  }
}

module.exports = BaseModel;
