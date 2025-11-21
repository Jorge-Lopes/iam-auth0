const setUserRole = async (userId, roleId) => {
  const res = await fetch(
    `https://${encodeURIComponent(process.env.AUTH0_DOMAIN)}/api/v2/users/${encodeURIComponent(userId)}/roles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AUTH0_MGMT_TOKEN}`,
      },
      body: JSON.stringify({
        roles: [roleId],
      }),
    },
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errText}`);
  }
};

export default setUserRole;
