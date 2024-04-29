import authMiddleware from '../../../middleware/auth';

async function handler(req, res) {
  await authMiddleware(req, res, async () => {
    // This code will only run if the user is authenticated
    if (req.user.role === 'admin') {
      res.status(200).json({ message: 'This is a protected admin route' });
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  });
}

export { handler as GET, handler as POST}
