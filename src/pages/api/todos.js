// import type { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

import { prisma } from "../../../lib/prisma";

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
  const { user } = getSession(req, res);

  if (req.method === "GET") {
    // get all todos
    const todos = await prisma.todo.findMany({
      where: { userId: user?.sub },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(todos);
  } else if (req.method === "POST") {
    // create todo
    const todo = await prisma.todo.create({
      data: { text: req.body.text, completed: false, userId: user?.sub },
    });

    res.status(200).json(todo);
  } else if (req.method === "PUT") {
    // update todo
    const id = req.query.upd;
    const todo = await prisma.todo.update({
      where: { id },
      data: { ...req.body },
    });

    res.status(200).json(todo);
  } else if (req.method === "DELETE") {
    // delete todo
    const id = req.query.del;
    await prisma.todo.delete({ where: { id } });

    res.status(200).json({ msg: "ok" });
  } else {
    res.status(201).json({ msg: "REST method not supported" });
  }
});
