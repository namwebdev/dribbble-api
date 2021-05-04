const setPagination = (page, limit, total) => {
  const total_pages = Math.ceil(total / limit);
  return {
    page,
    total,
    total_pages,
    per_page: limit,
  };
};

module.exports = { setPagination };
