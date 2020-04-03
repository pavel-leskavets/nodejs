module.exports = columns =>
  columns.every(
    column => column.title !== undefined && column.order !== undefined
  );
