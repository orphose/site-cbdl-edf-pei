"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Error Boundary générique
 * Capture les erreurs de rendu dans l'arbre enfant
 * et affiche un fallback au lieu de crasher tout le site
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="py-12 text-center">
          <p className="text-edf-gris-moyen text-sm">
            Une erreur est survenue lors du chargement de cette section.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
