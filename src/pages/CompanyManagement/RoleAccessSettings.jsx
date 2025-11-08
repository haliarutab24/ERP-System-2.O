import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, EyeOff, Users, Calendar } from "lucide-react";
import { toast } from "sonner";

const mockRoles = [
    {
        id: 1,
        roleName: "Admin",
        modules: { Sales: true, Purchase: true, Stock: true, Accounting: true },
        lastUpdated: "2025-03-01 12:34",
        visible: true,
    },
    {
        id: 2,
        roleName: "Salesman",
        modules: { Sales: true, Purchase: false, Stock: false, Accounting: false },
        lastUpdated: "2025-03-02 09:21",
        visible: true,
    },
    {
        id: 3,
        roleName: "Accountant",
        modules: { Sales: false, Purchase: true, Stock: true, Accounting: true },
        lastUpdated: "2025-03-03 15:10",
        visible: false,
    },
];

const modulesList = ["Sales", "Purchase", "Stock", "Accounting"];

const RoleAccessSettings = () => {
    const [roles, setRoles] = useState(mockRoles);

    const handleToggleModule = (roleId, module) => {
        setRoles((prev) =>
            prev.map((r) =>
                r.id === roleId ? { ...r, modules: { ...r.modules, [module]: !r.modules[module] } } : r
            )
        );
    };

    const handleToggleVisibility = (roleId) => {
        setRoles((prev) =>
            prev.map((r) => (r.id === roleId ? { ...r, visible: !r.visible } : r))
        );
    };

    const handleEditRole = (roleId) => {
        toast.info(`Editing role: ${roles.find((r) => r.id === roleId).roleName}`);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 py-10">
                <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="border-b border-primary/20 pb-4">
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" /> Role Access Settings
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-muted/40 to-muted/20 border-b border-border/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/80 uppercase">
                                        Role Name
                                    </th>
                                    {modulesList.map((module) => (
                                        <th
                                            key={module}
                                            className="px-6 py-4 text-left text-sm font-semibold text-foreground/80 uppercase"
                                        >
                                            {module}
                                        </th>
                                    ))}
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/80 uppercase">
                                        Last Updated
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/80 uppercase">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border/30">
                                {roles.map((role) => (
                                    <tr
                                        key={role.id}
                                        className="group hover:bg-primary/5 transition-all duration-300 ease-in-out transform hover:scale-[1.002]"
                                    >
                                        <td className="px-6 py-4 font-medium">{role.roleName}</td>

                                        {modulesList.map((module) => (
                                            <td key={module} className="px-6 py-4">
                                                <Checkbox
                                                    checked={role.modules[module]}
                                                    onCheckedChange={() => handleToggleModule(role.id, module)}
                                                />
                                            </td>
                                        ))}

                                        <td className="px-6 py-4 text-sm text-muted-foreground flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-primary/60" />
                                            {role.lastUpdated}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="inline-flex gap-2 items-center min-w-[80px] justify-start">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600 transition-all duration-200 rounded-lg"
                                                    onClick={() => handleEditRole(role.id)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-lg"
                                                    onClick={() => handleToggleVisibility(role.id)}
                                                >
                                                    {role.visible ? (
                                                        <Eye className="w-4 h-4 text-primary" />
                                                    ) : (
                                                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                                                    )}
                                                </Button>
                                            </div>
                                        </td>

                                    </tr>
                                ))}

                                {roles.length === 0 && (
                                    <tr>
                                        <td colSpan={modulesList.length + 3} className="text-center py-12 text-muted-foreground">
                                            No roles found. Add a new role to manage module access.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default RoleAccessSettings;
