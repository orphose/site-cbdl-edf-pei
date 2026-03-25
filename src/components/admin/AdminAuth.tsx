"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  Button,
  Input,
} from "@nextui-org/react";
import {
  Lock,
  LayoutDashboard,
  ArrowLeft,
  Mail,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface AdminAuthProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  authError: string;
  authLoading: boolean;
  handleLogin: () => void;
}

export default function AdminAuth({
  email,
  setEmail,
  password,
  setPassword,
  authError,
  authLoading,
  handleLogin,
}: AdminAuthProps) {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-2 bg-edf-blue" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-edf-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-edf-orange/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-edf-green/5 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-edf-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Retour au site</span>
        </Link>
      </header>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border border-gray-100">
            <CardBody className="p-8">
              <div className="space-y-5">
                {authError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="admin@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    startContent={<Mail className="w-4 h-4 text-gray-400" />}
                    size="lg"
                    classNames={{
                      input: "text-base",
                      inputWrapper:
                        "h-14 bg-gray-50 border-gray-200 hover:bg-gray-100 focus-within:bg-white",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    startContent={<Lock className="w-4 h-4 text-gray-400" />}
                    size="lg"
                    classNames={{
                      input: "text-base",
                      inputWrapper:
                        "h-14 bg-gray-50 border-gray-200 hover:bg-gray-100 focus-within:bg-white",
                    }}
                  />
                </div>

                <Button
                  onPress={handleLogin}
                  isLoading={authLoading}
                  className="w-full h-14 bg-edf-blue hover:bg-edf-blue-dark text-white font-semibold text-base transition-all"
                  radius="md"
                >
                  {!authLoading && (
                    <LayoutDashboard className="w-5 h-5 mr-2" />
                  )}
                  Accéder au tableau de bord
                </Button>

                <p className="text-center text-xs text-gray-400">
                  Accès réservé aux administrateurs autorisés
                </p>
              </div>
            </CardBody>
          </Card>

          <p className="text-center text-xs text-gray-400 mt-8">
            © {new Date().getFullYear()} EDF PEI - Tous droits réservés
          </p>
        </motion.div>
      </div>
    </div>
  );
}
