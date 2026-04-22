import useAuthContext from "../hooks/useAuthContext";
import StudentDashboard from "../components/StudentDashboard";
import TeacherDashboard from "../components/TeacherDashboard";
import AdminDashboard from "../components/AdminDashboard";

export default function Dashboard() {
    const { user } = useAuthContext();

    if (!user) return null;

    if (user.role === 'admin') {
        return <AdminDashboard user={user} />;
    } else if (user.role === 'teacher') {
        return <TeacherDashboard user={user} />;
    } else {
        return <StudentDashboard user={user} />;
    }
}