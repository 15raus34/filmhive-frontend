export const isValidEmail = (email) => {
  // eslint-disable-next-line
  const emailRegularEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegularEx.test(email);
};

export const isValidName = (name) => {
  const nameRegularEx = /^[a-z A-Z]+$/;
  return nameRegularEx.test(name);
};

export const getToken = () => {
  return localStorage.getItem("auth-token");
};

export const catchError = (error) => {
  const { response } = error;
  if (response?.data) return response.data;
  return { error: error.message || error };
};

export const renderItem = (result) => {
  return (
    <div key={result.id} className="flex space-x-2 overflow-hidden rounded">
      <img
        src={result.avatar}
        alt={result.name}
        className="object-cover w-16 h-16"
      />
      <p className="font-semibold dark:text-white">{result.name}</p>
    </div>
  );
};

export const getPoster = (posters = []) => {
  const { length } = posters;

  if (!length) return null;
  if (length > 2) return posters[1];
  else return posters[0];
};

export const convertReviewCount = (count = 0) => {
  if (count <= 999) return count;

  return parseFloat(count / 1000).toFixed(2) + "K";
};
