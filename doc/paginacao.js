/* GET /api/users */
router.get('/', async (req, res) => {
    const USERS_PER_PAGE = 10;
    const page = Number(req.query.page) || 1; // Página desejada via Query String
  
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true
        },
        take: USERS_PER_PAGE,
        skip: (page - 1) * USERS_PER_PAGE,
      });
  
      const totalUsers = await prisma.user.count();
      const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);
  
      res.json({
        users,
        page,
        totalPages,
        totalUsers,
      });
    }
    catch(exception) {
      let error = exceptionHandler(exception);
      res.status(error.code).json({
        error: error.message
      });
    }
});