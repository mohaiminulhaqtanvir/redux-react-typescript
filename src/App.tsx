import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "./app/store";

import { increment, decrement, reset, setValue } from "./counter/counterSlice";

import { setUser } from "./counter/userSlice";
import { useEffect } from "react";
import { fetchPosts } from "./counter/postSlice";

function App() {
  const count = useSelector((state: RootState) => state.counter);
  const user = useSelector((state: RootState) => state.user);

  const { posts, isLoading } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  console.log(posts);

  return (
    <div>
      <h1>Redux Toolkit Counter</h1>
      <h2>{count?.count}</h2>
      <h2>{count?.value}</h2>
      <h2>{user?.name}</h2>
      <h2>{user?.email}</h2>

      <div className="d-flex gap-4">
        <div>
          <button onClick={() => dispatch(increment())}>+</button>
        </div>
        <div>
          <button onClick={() => dispatch(decrement())}>-</button>
        </div>
        <div>
          {" "}
          <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
        <div>
          {" "}
          <button onClick={() => dispatch(setValue({ value: 90 }))}>
            FixedValeOnClick
          </button>
        </div>
        <div>
          <button onClick={() => dispatch(setValue({ value: 90 }))}>
            FixedValeOnClick
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              dispatch(setUser({ name: "Tanvir", email: "Tanvir@gmail.com" }))
            }
          >
            setUser
          </button>
        </div>
        {isLoading ? <>loading.......................</> : null}
        {posts?.map((data, index) => {
          const newData = {
            serial: index + 1,
            postId: data.id,
            name: data.title,
            description: data.body,
          };

          return (
            <div key={newData.serial}>
              {newData?.serial}. {newData.name} . {newData.postId}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
