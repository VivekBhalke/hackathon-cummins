export const insertionController = async (req, res) => {
    const { email, category, date, actions } = req.body;
  
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const createdLogs = await Promise.all(
        actions.map(action =>
          prisma.sustainabilityLog.create({
            data: {
              userId: user.id,
              category,
              action,
              date: new Date(date)
            }
          })
        )
      );
  
      res.json(createdLogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to store logs' });
    }
  };

