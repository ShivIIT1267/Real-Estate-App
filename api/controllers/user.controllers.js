// here we keep all the req and res thing which we want to do
// for specific pages

export const test = (req, res) => {
  res.json({
    message: "api route is working",
  });
};
