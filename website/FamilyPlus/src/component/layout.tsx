import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-300 via-yellow-300 to-red-200 flex items-center justify-center flex-col">
      {children}
    </div>
  );
}
