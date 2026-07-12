import supabase from "./supabase";

type LoginData = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const {data: sessionData} = await supabase.auth.getSession();
  if (!sessionData.session) {
    return null;
  }
    const { data, error } = await supabase.auth.getUser();
    if(error) throw new Error(error.message);
    return data?.user;
}