import Image from "next/image";

const Navbar = ({ user }) => {
  if (!user) {
    return (
      <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
        <button
          style={{
            background: "none",
            border: "1px solid",
            cursor: "pointer",
            padding: "0.25rem 0.75rem",
          }}
        >
          <a href="/api/auth/login">
            <em>In</em>
          </a>
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        style={{
          background: "none",
          border: "1px solid",
          cursor: "pointer",
          padding: "0.25rem 0.75rem",
        }}
      >
        <a href="/api/auth/logout">
          <em>Out</em>
        </a>
      </button>
      <p>
        Welcome, <Image width={20} height={20} src={user.picture} />{" "}
        {user.name || user.nickname}
      </p>
    </div>
  );
};

export default Navbar;
