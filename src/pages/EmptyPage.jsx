import { useAppSettings } from "../contexts/AppSettingsContext";

const T = {
  fr: { inProgress: "Cette section est en cours de développement" },
  en: { inProgress: "This section is under development" },
  mg: { inProgress: "Ity fizarana ity mbola am-panamboarana" },
};

export default function EmptyPage({ title, icon = "🚧" }) {
  const { langue } = useAppSettings();
  const t = T[langue] || T.fr;

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center">
        <div className="text-6xl mb-4">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">{title}</h2>
        <p className="text-gray-400 dark:text-gray-500 text-sm">{t.inProgress}</p>
      </div>
    </div>
  );
}
