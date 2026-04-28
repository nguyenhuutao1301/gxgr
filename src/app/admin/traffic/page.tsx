"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTrafficData } from "@/api/admin/traffic";
import { ForwardIcon } from "@heroicons/react/24/outline";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import ClientMeta from "@/components/Client/ClientMetadata/ClientMetadata";

import { TrafficItem } from "@/types/traffic";
import Link from "next/link";

export default function AdminTraffic() {
  const [data, setData] = useState<TrafficItem[]>([]);
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<string>("");

  useEffect(() => {
    const fetchTrafficData = async () => {
      const result = await getTrafficData();
      if (result.success) {
        setData(result.data);
      } else {
        console.error("Error fetching traffic data:", result.error);
        setData([]);
      }
    };
    fetchTrafficData();
  }, []);

  const filtered = data.filter((item) => {
    let passType = true;
    if (filter === "bot") passType = item.isBot;
    else if (filter === "human") passType = !item.isBot;
    else if (filter === "ads") passType = item.isAds;
    else if (filter === "seo") passType = !item.isBot && !item.isAds;

    let passDate = true;
    if (dateFilter) {
      const itemDate = item.updatedAt.split("T")[0]; // Lấy yyyy-mm-dd
      passDate = itemDate === dateFilter;
    }

    return passType && passDate;
  });

  return (
    <>
      <ClientMeta title="Quản Lí Truy Cập" />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">📊 Thống Kê Traffic</h1>

        <Tabs
          defaultValue="all"
          className="mb-4"
          onValueChange={(v: any) => setFilter(v)}
        >
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="human">Người dùng</TabsTrigger>
            <TabsTrigger value="bot">Bot</TabsTrigger>
            <TabsTrigger value="ads">Quảng cáo</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>
          <input
            type="date"
            className="border p-1 rounded ml-4"
            onChange={(e) => setDateFilter(e.target.value)}
            value={dateFilter}
          />
        </Tabs>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>IP</TableHead>
                <TableHead>Ref</TableHead>
                <TableHead>Bot?</TableHead>
                <TableHead>Ads?</TableHead>
                <TableHead>Times</TableHead>
                <TableHead className="text-right">Chi tiết</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="truncate max-w-[100px]">
                    {item.Ip}
                  </TableCell>
                  <TableCell className="truncate max-w-[150px]">
                    {item.ref}
                  </TableCell>
                  <TableCell>{item.isBot ? "🤖 Bot" : "👤 Người"}</TableCell>
                  <TableCell>{item.isAds ? "✅" : "❌"}</TableCell>
                  <TableCell>{item.times ? item.times : 0}</TableCell>
                  <TableCell>
                    <Link href={`/admin/traffic/${item._id}`}>
                      <ForwardIcon className="h-5 w-5 text-blue-500 hover:text-blue-700 transition-colors" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
