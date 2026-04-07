"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Zap, Users, Phone, Clock, AlertTriangle, CheckCircle,
  Calendar, Loader2, ChevronRight, PhoneCall, PhoneMissed,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

type JobStatus = "Pending" | "Quoted" | "Booked" | "Completed";

interface Lead {
  id: string;
  name: string;
  jobType: string;
  area: string;
  urgency: "emergency" | "scheduled";
  timestamp: string;
  phone: string;
  status: JobStatus;
}

interface MissedCall {
  id: string;
  callerName: string;
  callerNumber: string;
  callTime: string;
  duration: string;
  script?: string;
  loadingScript?: boolean;
}

// ── Mock Data ──────────────────────────────────────────────────────────────────

const INITIAL_LEADS: Lead[] = [
  { id: "1", name: "Thabo Nkosi", jobType: "Distribution Board", area: "Roodepoort", urgency: "emergency", timestamp: "08:14", phone: "083 456 7890", status: "Pending" },
  { id: "2", name: "Sarah van der Berg", jobType: "COC Certificate", area: "Bryanston", urgency: "scheduled", timestamp: "09:02", phone: "071 234 5678", status: "Quoted" },
  { id: "3", name: "Pieter Coetzee", jobType: "Solar Installation", area: "Sandton", urgency: "scheduled", timestamp: "09:47", phone: "082 111 2233", status: "Booked" },
  { id: "4", name: "Ayesha Patel", jobType: "Fault Finding", area: "Fourways", urgency: "emergency", timestamp: "10:23", phone: "079 888 1122", status: "Pending" },
  { id: "5", name: "Gerrit Botha", jobType: "General Electrical", area: "Northcliff", urgency: "scheduled", timestamp: "11:05", phone: "060 333 4455", status: "Completed" },
];

const INITIAL_MISSED_CALLS: MissedCall[] = [
  { id: "m1", callerName: "Unknown", callerNumber: "083 921 4455", callTime: "07:32 AM", duration: "0 sec (missed)" },
  { id: "m2", callerName: "Bongani M.", callerNumber: "071 567 8899", callTime: "08:55 AM", duration: "0 sec (missed)" },
  { id: "m3", callerName: "Unknown", callerNumber: "060 123 0000", callTime: "10:44 AM", duration: "0 sec (missed)" },
];

const JOB_STATUSES: JobStatus[] = ["Pending", "Quoted", "Booked", "Completed"];

const statusColors: Record<JobStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Quoted: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  Booked: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  Completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [missedCalls, setMissedCalls] = useState<MissedCall[]>(INITIAL_MISSED_CALLS);
  const [activeTab, setActiveTab] = useState("overview");

  const today = new Date().toLocaleDateString("en-ZA", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const leadsToday = leads.length;
  const emergencies = leads.filter((l) => l.urgency === "emergency").length;
  const pending = leads.filter((l) => l.status === "Pending").length;
  const completed = leads.filter((l) => l.status === "Completed").length;

  const updateStatus = (id: string, status: JobStatus) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const generateCallbackScript = async (callId: string) => {
    setMissedCalls((prev) =>
      prev.map((c) => (c.id === callId ? { ...c, loadingScript: true } : c))
    );

    const call = missedCalls.find((c) => c.id === callId)!;

    try {
      const res = await fetch("/api/callback-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          callerName: call.callerName,
          callerNumber: call.callerNumber,
          callTime: call.callTime,
          duration: call.duration,
        }),
      });
      const data = await res.json();
      setMissedCalls((prev) =>
        prev.map((c) =>
          c.id === callId ? { ...c, script: data.script, loadingScript: false } : c
        )
      );
    } catch {
      setMissedCalls((prev) =>
        prev.map((c) =>
          c.id === callId
            ? {
                ...c,
                script: "Hi, this is Shaldon from Zeus Electrical. Sorry I missed your call — I was on a job. What can I help you with today?",
                loadingScript: false,
              }
            : c
        )
      );
    }
  };

  const jobsByStatus = JOB_STATUSES.reduce((acc, status) => {
    acc[status] = leads.filter((l) => l.status === status);
    return acc;
  }, {} as Record<JobStatus, Lead[]>);

  return (
    <div className="min-h-screen bg-muted/10">
      {/* Dashboard Header */}
      <div className="bg-[#0C2340] text-white px-4 sm:px-8 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-5 w-5 text-[#F5C518]" />
                <span className="text-[#F5C518] text-sm font-medium">Zeus Electrical — Owner Dashboard</span>
              </div>
              <h1 className="text-2xl font-bold">Good morning, Shaldon</h1>
              <p className="text-white/60 text-sm">{today}</p>
            </div>
            <a href="tel:+27607902941">
              <Button className="bg-[#F5C518] text-[#0C2340] hover:bg-[#F5C518]/90 font-bold gap-2">
                <PhoneCall className="h-4 w-4" />
                Your Number
              </Button>
            </a>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { label: "Leads Today", value: leadsToday, icon: <Users className="h-4 w-4" />, color: "text-[#F5C518]" },
              { label: "Emergencies", value: emergencies, icon: <AlertTriangle className="h-4 w-4" />, color: "text-red-400" },
              { label: "Pending", value: pending, icon: <Clock className="h-4 w-4" />, color: "text-orange-400" },
              { label: "Completed", value: completed, icon: <CheckCircle className="h-4 w-4" />, color: "text-green-400" },
            ].map((k) => (
              <div key={k.label} className="bg-white/10 rounded-xl p-4">
                <div className={`flex items-center gap-2 mb-2 ${k.color}`}>
                  {k.icon}
                  <span className="text-xs text-white/60">{k.label}</span>
                </div>
                <div className="text-3xl font-bold text-white">{k.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-3 sm:px-8 py-4 sm:py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 sm:mb-6 w-full sm:w-auto">
            <TabsTrigger value="overview">Leads</TabsTrigger>
            <TabsTrigger value="board">Job Board</TabsTrigger>
            <TabsTrigger value="missed">
              Missed Calls
              {missedCalls.length > 0 && (
                <span className="ml-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {missedCalls.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Leads Tab */}
          <TabsContent value="overview">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Today&apos;s Leads</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {leads.map((lead) => (
                    <div key={lead.id} className="px-3 sm:px-6 py-3 hover:bg-muted/20 transition-colors">
                      {/* Top row: icon + name/badge + time + call button */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            lead.urgency === "emergency" ? "bg-red-100 dark:bg-red-900/30" : "bg-blue-100 dark:bg-blue-900/30"
                          }`}
                        >
                          {lead.urgency === "emergency" ? (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          ) : (
                            <Calendar className="h-4 w-4 text-blue-600" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-semibold text-sm truncate">{lead.name}</span>
                            {lead.urgency === "emergency" && (
                              <Badge variant="destructive" className="text-[10px] px-1.5 py-0 flex-shrink-0">EMERGENCY</Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {lead.jobType} · {lead.area}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs text-muted-foreground hidden sm:block mr-1">{lead.timestamp}</span>
                          <a href={`tel:${lead.phone.replace(/\s/g, "")}`}>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </a>
                        </div>
                      </div>

                      {/* Bottom row: phone + status pills */}
                      <div className="flex items-center gap-2 mt-2 pl-11 flex-wrap">
                        <span className="text-xs text-muted-foreground mr-auto">{lead.phone}</span>
                        <div className="flex gap-1 flex-wrap">
                          {JOB_STATUSES.map((s) => (
                            <button
                              key={s}
                              onClick={() => updateStatus(lead.id, s)}
                              className={`text-xs px-2 py-0.5 rounded-full border transition-all ${
                                lead.status === s
                                  ? statusColors[s] + " border-transparent font-semibold"
                                  : "border-muted text-muted-foreground hover:border-foreground/30"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Job Board Tab */}
          <TabsContent value="board">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {JOB_STATUSES.map((status) => (
                <div key={status} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{status}</h3>
                    <span className="text-xs bg-muted rounded-full px-2 py-0.5">{jobsByStatus[status].length}</span>
                  </div>
                  <div className="space-y-2">
                    {jobsByStatus[status].map((job) => (
                      <Card key={job.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="font-medium text-sm">{job.name}</span>
                            {job.urgency === "emergency" && (
                              <span className="text-red-500 flex-shrink-0">
                                <AlertTriangle className="h-3.5 w-3.5" />
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground space-y-0.5">
                            <div>{job.jobType}</div>
                            <div>{job.area} · {job.timestamp}</div>
                          </div>
                          <div className="flex gap-1 mt-2 flex-wrap">
                            {JOB_STATUSES.filter((s) => s !== status).map((s) => (
                              <button
                                key={s}
                                onClick={() => updateStatus(job.id, s)}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground flex items-center gap-0.5"
                              >
                                <ChevronRight className="h-2.5 w-2.5" /> {s}
                              </button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {jobsByStatus[status].length === 0 && (
                      <div className="border-2 border-dashed rounded-xl p-4 text-center text-xs text-muted-foreground">
                        No {status.toLowerCase()} jobs
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Missed Calls Tab */}
          <TabsContent value="missed">
            <div className="space-y-4">
              {missedCalls.length === 0 ? (
                <Card>
                  <CardContent className="p-10 text-center text-muted-foreground">
                    <CheckCircle className="h-10 w-10 mx-auto mb-3 text-green-500" />
                    <p>No missed calls today</p>
                  </CardContent>
                </Card>
              ) : (
                missedCalls.map((call) => (
                  <Card key={call.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border-b">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="h-9 w-9 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                            <PhoneMissed className="h-4 w-4 text-red-500" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-sm">{call.callerName}</div>
                            <div className="text-xs text-muted-foreground truncate">{call.callerNumber} · {call.callTime}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <a href={`tel:${call.callerNumber.replace(/\s/g, "")}`}>
                            <Button size="sm" variant="outline" className="gap-1.5">
                              <Phone className="h-3.5 w-3.5" />
                              Call Back
                            </Button>
                          </a>
                          {!call.script && (
                            <Button
                              size="sm"
                              onClick={() => generateCallbackScript(call.id)}
                              disabled={call.loadingScript}
                              className="bg-[#0C2340] text-white hover:bg-[#0C2340]/90 gap-1.5"
                            >
                              {call.loadingScript ? (
                                <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating...</>
                              ) : (
                                <><Zap className="h-3.5 w-3.5" /> Generate Script</>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>

                      {call.script && (
                        <div className="p-4 bg-[#F5C518]/5 border-l-4 border-l-[#F5C518]">
                          <div className="text-xs font-semibold text-[#0C2340] dark:text-[#F5C518] mb-2 flex items-center gap-1.5">
                            <Zap className="h-3 w-3" />
                            AI Callback Script
                          </div>
                          <p className="text-sm leading-relaxed italic text-foreground/80">&ldquo;{call.script}&rdquo;</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="mt-2 h-7 text-xs"
                            onClick={() => generateCallbackScript(call.id)}
                          >
                            Regenerate
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
