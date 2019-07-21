export default (req: any, res: any) => {
  if (!!req) req.decodedToken = null
  res.json({ status: true })
}
