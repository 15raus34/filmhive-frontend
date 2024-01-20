import React from "react";
import NotificationProvider from "./NotificationProvider";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import SearchProvider from "./SearchProvider";
import MovieProvider from "./MoviesProvider";

export default function ContextProvider({ children }) {
  return (
    <NotificationProvider>
      <SearchProvider>
        <MovieProvider>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </MovieProvider>
      </SearchProvider>
    </NotificationProvider>
  );
}
