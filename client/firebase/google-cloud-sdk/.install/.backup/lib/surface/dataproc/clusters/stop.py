# -*- coding: utf-8 -*- #
# Copyright 2020 Google LLC. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Stop cluster command."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from googlecloudsdk.api_lib.dataproc import dataproc as dp
from googlecloudsdk.api_lib.dataproc import util
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.dataproc import flags
from googlecloudsdk.core import log
from googlecloudsdk.core.console import console_io


@base.Hidden
@base.ReleaseTracks(base.ReleaseTrack.ALPHA, base.ReleaseTrack.BETA)
class Stop(base.Command):
  """Stop a cluster."""

  detailed_help = {
      'EXAMPLES': """
          To stop a cluster, run:

            $ {command} my_cluster --region=us-central1
          """,
  }

  @classmethod
  def Args(cls, parser):
    base.ASYNC_FLAG.AddToParser(parser)
    flags.AddTimeoutFlag(parser)
    dataproc = dp.Dataproc(cls.ReleaseTrack())
    flags.AddClusterResourceArg(parser, 'stop', dataproc.api_version)

  def Run(self, args):
    dataproc = dp.Dataproc(self.ReleaseTrack())

    cluster_ref = args.CONCEPTS.cluster.Parse()

    request = dataproc.messages.DataprocProjectsRegionsClustersStopRequest(
        clusterName=cluster_ref.clusterName,
        region=cluster_ref.region,
        projectId=cluster_ref.projectId,
        requestId=util.GetUniqueId())

    console_io.PromptContinue(
        message="Cluster '{0}' is stopping."
        .format(cluster_ref.clusterName),
        cancel_on_no=True,
        cancel_string='Stopping cluster aborted by user.')

    operation = dataproc.client.projects_regions_clusters.Stop(request)

    if args.async_:
      log.status.write('Stopping [{0}] with operation [{1}].'.format(
          cluster_ref, operation.name))
      return operation

    operation = util.WaitForOperation(
        dataproc,
        operation,
        message='Waiting for cluster to stop.',
        timeout_s=args.timeout)

    return operation
