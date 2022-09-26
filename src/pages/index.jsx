// import { NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import { createTodo, deleteTodo, toggleTodo, useTodos } from "../api";
import styles from "../styles/Home.module.css";
// import { Todo } from "../types";

import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

import { getSession, useUser } from "@auth0/nextjs-auth0";
import Navbar from "../components/Navbar";

const Home = (props) => {
  // const { user } = props;

  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Railway NextJS Prisma</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>Todos</h1>
        <h2 className={styles.desc}>
          NextJS app connected to Postgres using Prisma and hosted on{" "}
          <a href="https://railway.app">Railway</a>
        </h2>
        <Navbar user={user} />
      </header>

      <main className={styles.main}>
        {user ? (
          <>
            <AddTodo />
            <TodoList />
          </>
        ) : (
          <p>
            <a href="/api/auth/login">Login</a> above to see your stuff
          </p>
        )}
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (ctx) => {
  // const session = getSession(ctx.req, ctx.res);

  return {
    props: {
      // user: session?.user || null,
    },
  };
};
