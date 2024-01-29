export const requestGraphql = async (payload, option) => {
  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepted: "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      ...option
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};
