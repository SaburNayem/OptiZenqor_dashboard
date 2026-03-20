import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useDashboardState({
  initialUsers,
  initialProducts,
  initialPosts,
  initialFeatures,
}) {
  const navigate = useNavigate();
  const [users, setUsers] = useState(initialUsers);
  const [products, setProducts] = useState(initialProducts);
  const [posts, setPosts] = useState(initialPosts);
  const [features, setFeatures] = useState(initialFeatures);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "Productivity",
    inventory: "",
    price: "",
  });
  const [postForm, setPostForm] = useState({
    title: "",
    author: "",
    channel: "Blog",
  });

  const stats = useMemo(
    () => [
      {
        label: "Managed users",
        value: users.length,
        change: "+12% this month",
      },
      {
        label: "Published products",
        value: products.filter((item) => item.status === "Published").length,
        change: "4 ready to promote",
      },
      {
        label: "Active posts",
        value: posts.filter((item) => item.status !== "Draft").length,
        change: "3 in publishing flow",
      },
      {
        label: "Enabled features",
        value: features.filter((item) => item.enabled).length,
        change: "1 staged rollout",
      },
    ],
    [users, products, posts, features],
  );

  const pendingActions =
    users.filter((user) => user.status !== "Active").length +
    products.filter((product) => product.status !== "Published").length +
    posts.filter((post) => post.status !== "Published").length +
    features.filter((feature) => !feature.enabled).length;

  function cycleUserStatus(userId) {
    const nextStatus = {
      Active: "Review",
      Review: "Suspended",
      Suspended: "Active",
    };

    setUsers((current) =>
      current.map((user) =>
        user.id === userId ? { ...user, status: nextStatus[user.status] } : user,
      ),
    );
  }

  function cycleProductStatus(productId) {
    const nextStatus = {
      Published: "Low Stock",
      "Low Stock": "Draft",
      Draft: "Published",
    };

    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, status: nextStatus[product.status] }
          : product,
      ),
    );
  }

  function cyclePostStatus(postId) {
    const nextStatus = {
      Published: "Scheduled",
      Scheduled: "Review",
      Review: "Published",
    };

    setPosts((current) =>
      current.map((post) =>
        post.id === postId ? { ...post, status: nextStatus[post.status] } : post,
      ),
    );
  }

  function toggleFeature(featureId) {
    setFeatures((current) =>
      current.map((feature) =>
        feature.id === featureId ? { ...feature, enabled: !feature.enabled } : feature,
      ),
    );
  }

  function handleProductSubmit(event) {
    event.preventDefault();

    if (!productForm.name || !productForm.inventory || !productForm.price) {
      return;
    }

    setProducts((current) => [
      {
        id: `PRD-${current.length + 11}`,
        name: productForm.name,
        category: productForm.category,
        inventory: Number(productForm.inventory),
        price: productForm.price.startsWith("$") ? productForm.price : `$${productForm.price}`,
        status: "Draft",
        sales: 0,
      },
      ...current,
    ]);

    setProductForm({
      name: "",
      category: "Productivity",
      inventory: "",
      price: "",
    });
    navigate("/products");
  }

  function handlePostSubmit(event) {
    event.preventDefault();

    if (!postForm.title || !postForm.author) {
      return;
    }

    setPosts((current) => [
      {
        id: `PST-${current.length + 71}`,
        title: postForm.title,
        author: postForm.author,
        channel: postForm.channel,
        status: "Review",
        reach: "0.0K",
        publishedAt: "Pending",
      },
      ...current,
    ]);

    setPostForm({
      title: "",
      author: "",
      channel: "Blog",
    });
    navigate("/posts");
  }

  return {
    users,
    products,
    posts,
    features,
    productForm,
    setProductForm,
    postForm,
    setPostForm,
    stats,
    pendingActions,
    cycleUserStatus,
    cycleProductStatus,
    cyclePostStatus,
    toggleFeature,
    handleProductSubmit,
    handlePostSubmit,
  };
}
