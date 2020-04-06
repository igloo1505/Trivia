"""Generated client library for datamigration version v1alpha2."""
# NOTE: This file is autogenerated and should not be edited by hand.
from apitools.base.py import base_api
from googlecloudsdk.third_party.apis.datamigration.v1alpha2 import datamigration_v1alpha2_messages as messages


class DatamigrationV1alpha2(base_api.BaseApiClient):
  """Generated client library for service datamigration version v1alpha2."""

  MESSAGES_MODULE = messages
  BASE_URL = u'https://datamigration.googleapis.com/'
  MTLS_BASE_URL = u'https://datamigration.mtls.googleapis.com/'

  _PACKAGE = u'datamigration'
  _SCOPES = [u'https://www.googleapis.com/auth/cloud-platform']
  _VERSION = u'v1alpha2'
  _CLIENT_ID = '1042881264118.apps.googleusercontent.com'
  _CLIENT_SECRET = 'x_Tw5K8nnjoRAqULM9PFAC2b'
  _USER_AGENT = 'x_Tw5K8nnjoRAqULM9PFAC2b'
  _CLIENT_CLASS_NAME = u'DatamigrationV1alpha2'
  _URL_VERSION = u'v1alpha2'
  _API_KEY = None

  def __init__(self, url='', credentials=None,
               get_credentials=True, http=None, model=None,
               log_request=False, log_response=False,
               credentials_args=None, default_global_params=None,
               additional_http_headers=None, response_encoding=None):
    """Create a new datamigration handle."""
    url = url or self.BASE_URL
    super(DatamigrationV1alpha2, self).__init__(
        url, credentials=credentials,
        get_credentials=get_credentials, http=http, model=model,
        log_request=log_request, log_response=log_response,
        credentials_args=credentials_args,
        default_global_params=default_global_params,
        additional_http_headers=additional_http_headers,
        response_encoding=response_encoding)
    self.projects_locations_connectionProfiles = self.ProjectsLocationsConnectionProfilesService(self)
    self.projects_locations_migrationJobs = self.ProjectsLocationsMigrationJobsService(self)
    self.projects_locations_operations = self.ProjectsLocationsOperationsService(self)
    self.projects_locations = self.ProjectsLocationsService(self)
    self.projects = self.ProjectsService(self)

  class ProjectsLocationsConnectionProfilesService(base_api.BaseApiService):
    """Service class for the projects_locations_connectionProfiles resource."""

    _NAME = u'projects_locations_connectionProfiles'

    def __init__(self, client):
      super(DatamigrationV1alpha2.ProjectsLocationsConnectionProfilesService, self).__init__(client)
      self._upload_configs = {
          }

    def Create(self, request, global_params=None):
      r"""Creates a new connection profile in a given project and location.

      Args:
        request: (DatamigrationProjectsLocationsConnectionProfilesCreateRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Create')
      return self._RunMethod(
          config, request, global_params=global_params)

    Create.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/connectionProfiles',
        http_method=u'POST',
        method_id=u'datamigration.projects.locations.connectionProfiles.create',
        ordered_params=[u'parent'],
        path_params=[u'parent'],
        query_params=[u'connectionProfileId', u'requestId'],
        relative_path=u'v1alpha2/{+parent}/connectionProfiles',
        request_field=u'connectionProfile',
        request_type_name=u'DatamigrationProjectsLocationsConnectionProfilesCreateRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def Delete(self, request, global_params=None):
      r"""Deletes a single Database Migration Service connection profile.
A connection profile can only be deleted if it is not in use by any
active migration jobs.

      Args:
        request: (DatamigrationProjectsLocationsConnectionProfilesDeleteRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Delete')
      return self._RunMethod(
          config, request, global_params=global_params)

    Delete.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}',
        http_method=u'DELETE',
        method_id=u'datamigration.projects.locations.connectionProfiles.delete',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[u'force', u'requestId'],
        relative_path=u'v1alpha2/{+name}',
        request_field='',
        request_type_name=u'DatamigrationProjectsLocationsConnectionProfilesDeleteRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def Get(self, request, global_params=None):
      r"""Gets details of a single connection profile.

      Args:
        request: (DatamigrationProjectsLocationsConnectionProfilesGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ConnectionProfile) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}',
        http_method=u'GET',
        method_id=u'datamigration.projects.locations.connectionProfiles.get',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1alpha2/{+name}',
        request_field='',
        request_type_name=u'DatamigrationProjectsLocationsConnectionProfilesGetRequest',
        response_type_name=u'ConnectionProfile',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      r"""Retrieve a list of all connection profiles in a given project and location.

      Args:
        request: (DatamigrationProjectsLocationsConnectionProfilesListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ListConnectionProfilesResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/connectionProfiles',
        http_method=u'GET',
        method_id=u'datamigration.projects.locations.connectionProfiles.list',
        ordered_params=[u'parent'],
        path_params=[u'parent'],
        query_params=[u'filter', u'orderBy', u'pageSize', u'pageToken'],
        relative_path=u'v1alpha2/{+parent}/connectionProfiles',
        request_field='',
        request_type_name=u'DatamigrationProjectsLocationsConnectionProfilesListRequest',
        response_type_name=u'ListConnectionProfilesResponse',
        supports_download=False,
    )

    def Patch(self, request, global_params=None):
      r"""Update the configuration of a single connection profile.

      Args:
        request: (DatamigrationProjectsLocationsConnectionProfilesPatchRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Patch')
      return self._RunMethod(
          config, request, global_params=global_params)

    Patch.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}',
        http_method=u'PATCH',
        method_id=u'datamigration.projects.locations.connectionProfiles.patch',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[u'requestId', u'updateMask'],
        relative_path=u'v1alpha2/{+name}',
        request_field=u'connectionProfile',
        request_type_name=u'DatamigrationProjectsLocationsConnectionProfilesPatchRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

  class ProjectsLocationsMigrationJobsService(base_api.BaseApiService):
    """Service class for the projects_locations_migrationJobs resource."""

    _NAME = u'projects_locations_migrationJobs'

    def __init__(self, client):
      super(DatamigrationV1alpha2.ProjectsLocationsMigrationJobsService, self).__init__(client)
      self._upload_configs = {
          }

    def Create(self, request, global_params=None):
      r"""Creates a new migration job in a given project and location.

      Args:
        request: (DatamigrationProjectsLocationsMigrationJobsCreateRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Create')
      return self._RunMethod(
          config, request, global_params=global_params)

    Create.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/migrationJobs',
        http_method=u'POST',
        method_id=u'datamigration.projects.locations.migrationJobs.create',
        ordered_params=[u'parent'],
        path_params=[u'parent'],
        query_params=[u'migrationJobId', u'requestId'],
        relative_path=u'v1alpha2/{+parent}/migrationJobs',
        request_field=u'migrationJob',
        request_type_name=u'DatamigrationProjectsLocationsMigrationJobsCreateRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def Delete(self, request, global_params=None):
      r"""Deletes a single migration job.

      Args:
        request: (DatamigrationProjectsLocationsMigrationJobsDeleteRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Delete')
      return self._RunMethod(
          config, request, global_params=global_params)

    Delete.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}',
        http_method=u'DELETE',
        method_id=u'datamigration.projects.locations.migrationJobs.delete',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[u'force', u'requestId'],
        relative_path=u'v1alpha2/{+name}',
        request_field='',
        request_type_name=u'DatamigrationProjectsLocationsMigrationJobsDeleteRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def GenerateSshScript(self, request, global_params=None):
      r"""Generate a SSH configuration script to configure the reverse SSH.
connectivity.

      Args:
        request: (DatamigrationProjectsLocationsMigrationJobsGenerateSshScriptRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (SshScript) The response message.
      """
      config = self.GetMethodConfig('GenerateSshScript')
      return self._RunMethod(
          config, request, global_params=global_params)

    GenerateSshScript.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:generateSshScript',
        http_method=u'POST',
        method_id=u'datamigration.projects.locations.migrationJobs.generateSshScript',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1alpha2/{+name}:generateSshScript',
        request_field=u'generateSshScriptRequest',
        request_type_name=u'DatamigrationProjectsLocationsMigrationJobsGenerateSshScriptRequest',
        response_type_name=u'SshScript',
        supports_download=False,
    )

    def Get(self, request, global_params=None):
      r"""Gets details of a single migration job.

      Args:
        request: (DatamigrationProjectsLocationsMigrationJobsGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (MigrationJob) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}',
        http_method=u'GET',
        method_id=u'datamigration.projects.locations.migrationJobs.get',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1alpha2/{+name}',
        request_field='',
        request_type_name=u'DatamigrationProjectsLocationsMigrationJobsGetRequest',
        response_type_name=u'MigrationJob',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      r"""Lists migration jobs in a given project and location.

      Args:
        request: (DatamigrationProjectsLocationsMigrationJobsListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ListMigrationJobsResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/migrationJobs',
        http_method=u'GET',
        method_id=u'datamigration.projects.locations.migrationJobs.list',
        ordered_params=[u'parent'],
        path_params=[u'parent'],
        query_params=[u'filter', u'orderBy', u'pageSize', u'pageToken'],
        relative_path=u'v1alpha2/{+parent}/migrationJobs',
        request_field='',
        request_type_name=u'DatamigrationProjectsLocationsMigrationJobsListRequest',
        response_type_name=u'ListMigrationJobsResponse',
        supports_download=False,
    )

    def Patch(self, request, global_params=None):
      r"""Updates the parameters of a single migration job.

      Args:
        request: (DatamigrationProjectsLocationsMigrationJobsPatchRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Patch')
      return self._RunMethod(
          config, request, global_params=global_params)

    Patch.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}',
        http_method=u'PATCH',
        method_id=u'datamigration.projects.locations.migrationJobs.patch',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[u'requestId', u'updateMask'],
        relative_path=u'v1alpha2/{+name}',
        request_field=u'migrationJob',
        request_type_name=u'DatamigrationProjectsLocationsMigrationJobsPatchRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def Promote(self, request, global_params=None):
      r"""Promote a migration job, stopping replication to the destination and.
promoting the destination to be a standalone database.

      Args:
        request: (DatamigrationProjectsLocationsMigrationJobsPromoteRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Promote')
      return self._RunMethod(
          config, request, global_params=global_params)

    Promote.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:promote',
        http_method=u'POST',
        method_id=u'datamigration.projects.locations.migrationJobs.promote',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1alpha2/{+name}:promote',
        request_field=u'promoteMigrationJobRequest',
        request_type_name=u'DatamigrationProjectsLocationsMigrationJobsPromoteRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def Restart(self, request, global_params=None):
      r"""Restart a stopped or failed migration job, resetting the destination.
instance to its original state and starting the migration process from
scratch.

      Args:
        request: (DatamigrationProjectsLocationsMigrationJobsRestartRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Restart')
      return self._RunMethod(
          config, request, global_params=global_params)

    Restart.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:restart',
        http_method=u'POST',
        method_id=u'datamigration.projects.locations.migrationJobs.restart',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1alpha2/{+name}:restart',
        request_field=u'restartMigrationJobRequest',
        request_type_name=u'DatamigrationProjectsLocationsMigrationJobsRestartRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def Resume(self, request, global_params=None):
      r"""Resume a migration job that is currently stopped and is resumable (was.
stopped during CDC phase).

      Args:
        request: (DatamigrationProjectsLocationsMigrationJobsResumeRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Resume')
      return self._RunMethod(
          config, request, global_params=global_params)

    Resume.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:resume',
        http_method=u'POST',
        method_id=u'datamigration.projects.locations.migrationJobs.resume',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1alpha2/{+name}:resume',
        request_field=u'resumeMigrationJobRequest',
        request_type_name=u'DatamigrationProjectsLocationsMigrationJobsResumeRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def Start(self, request, global_params=None):
      r"""Start an already created migration job.

      Args:
        request: (DatamigrationProjectsLocationsMigrationJobsStartRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Start')
      return self._RunMethod(
          config, request, global_params=global_params)

    Start.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:start',
        http_method=u'POST',
        method_id=u'datamigration.projects.locations.migrationJobs.start',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1alpha2/{+name}:start',
        request_field=u'startMigrationJobRequest',
        request_type_name=u'DatamigrationProjectsLocationsMigrationJobsStartRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def Stop(self, request, global_params=None):
      r"""Stops a running migration job.

      Args:
        request: (DatamigrationProjectsLocationsMigrationJobsStopRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Stop')
      return self._RunMethod(
          config, request, global_params=global_params)

    Stop.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:stop',
        http_method=u'POST',
        method_id=u'datamigration.projects.locations.migrationJobs.stop',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1alpha2/{+name}:stop',
        request_field=u'stopMigrationJobRequest',
        request_type_name=u'DatamigrationProjectsLocationsMigrationJobsStopRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def Verify(self, request, global_params=None):
      r"""Verify a migration job, making sure the destination can reach the source.
and that all configuration and prerequisites are met.

      Args:
        request: (DatamigrationProjectsLocationsMigrationJobsVerifyRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Verify')
      return self._RunMethod(
          config, request, global_params=global_params)

    Verify.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:verify',
        http_method=u'POST',
        method_id=u'datamigration.projects.locations.migrationJobs.verify',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1alpha2/{+name}:verify',
        request_field=u'verifyMigrationJobRequest',
        request_type_name=u'DatamigrationProjectsLocationsMigrationJobsVerifyRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

  class ProjectsLocationsOperationsService(base_api.BaseApiService):
    """Service class for the projects_locations_operations resource."""

    _NAME = u'projects_locations_operations'

    def __init__(self, client):
      super(DatamigrationV1alpha2.ProjectsLocationsOperationsService, self).__init__(client)
      self._upload_configs = {
          }

    def Cancel(self, request, global_params=None):
      r"""Starts asynchronous cancellation on a long-running operation.  The server.
makes a best effort to cancel the operation, but success is not
guaranteed.  If the server doesn't support this method, it returns
`google.rpc.Code.UNIMPLEMENTED`.  Clients can use
Operations.GetOperation or
other methods to check whether the cancellation succeeded or whether the
operation completed despite cancellation. On successful cancellation,
the operation is not deleted; instead, it becomes an operation with
an Operation.error value with a google.rpc.Status.code of 1,
corresponding to `Code.CANCELLED`.

      Args:
        request: (DatamigrationProjectsLocationsOperationsCancelRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Empty) The response message.
      """
      config = self.GetMethodConfig('Cancel')
      return self._RunMethod(
          config, request, global_params=global_params)

    Cancel.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel',
        http_method=u'POST',
        method_id=u'datamigration.projects.locations.operations.cancel',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1alpha2/{+name}:cancel',
        request_field=u'cancelOperationRequest',
        request_type_name=u'DatamigrationProjectsLocationsOperationsCancelRequest',
        response_type_name=u'Empty',
        supports_download=False,
    )

    def Delete(self, request, global_params=None):
      r"""Deletes a long-running operation. This method indicates that the client is.
no longer interested in the operation result. It does not cancel the
operation. If the server doesn't support this method, it returns
`google.rpc.Code.UNIMPLEMENTED`.

      Args:
        request: (DatamigrationProjectsLocationsOperationsDeleteRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Empty) The response message.
      """
      config = self.GetMethodConfig('Delete')
      return self._RunMethod(
          config, request, global_params=global_params)

    Delete.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}',
        http_method=u'DELETE',
        method_id=u'datamigration.projects.locations.operations.delete',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1alpha2/{+name}',
        request_field='',
        request_type_name=u'DatamigrationProjectsLocationsOperationsDeleteRequest',
        response_type_name=u'Empty',
        supports_download=False,
    )

    def Get(self, request, global_params=None):
      r"""Gets the latest state of a long-running operation.  Clients can use this.
method to poll the operation result at intervals as recommended by the API
service.

      Args:
        request: (DatamigrationProjectsLocationsOperationsGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}',
        http_method=u'GET',
        method_id=u'datamigration.projects.locations.operations.get',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1alpha2/{+name}',
        request_field='',
        request_type_name=u'DatamigrationProjectsLocationsOperationsGetRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      r"""Lists operations that match the specified filter in the request. If the.
server doesn't support this method, it returns `UNIMPLEMENTED`.

NOTE: the `name` binding allows API services to override the binding
to use different resource name schemes, such as `users/*/operations`. To
override the binding, API services can add a binding such as
`"/v1/{name=users/*}/operations"` to their service configuration.
For backwards compatibility, the default name includes the operations
collection id, however overriding users must ensure the name binding
is the parent resource, without the operations collection id.

      Args:
        request: (DatamigrationProjectsLocationsOperationsListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ListOperationsResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}/operations',
        http_method=u'GET',
        method_id=u'datamigration.projects.locations.operations.list',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[u'filter', u'pageSize', u'pageToken'],
        relative_path=u'v1alpha2/{+name}/operations',
        request_field='',
        request_type_name=u'DatamigrationProjectsLocationsOperationsListRequest',
        response_type_name=u'ListOperationsResponse',
        supports_download=False,
    )

  class ProjectsLocationsService(base_api.BaseApiService):
    """Service class for the projects_locations resource."""

    _NAME = u'projects_locations'

    def __init__(self, client):
      super(DatamigrationV1alpha2.ProjectsLocationsService, self).__init__(client)
      self._upload_configs = {
          }

    def Get(self, request, global_params=None):
      r"""Gets information about a location.

      Args:
        request: (DatamigrationProjectsLocationsGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Location) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations/{locationsId}',
        http_method=u'GET',
        method_id=u'datamigration.projects.locations.get',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1alpha2/{+name}',
        request_field='',
        request_type_name=u'DatamigrationProjectsLocationsGetRequest',
        response_type_name=u'Location',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      r"""Lists information about the supported locations for this service.

      Args:
        request: (DatamigrationProjectsLocationsListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ListLocationsResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1alpha2/projects/{projectsId}/locations',
        http_method=u'GET',
        method_id=u'datamigration.projects.locations.list',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[u'filter', u'includeUnrevealedLocations', u'pageSize', u'pageToken'],
        relative_path=u'v1alpha2/{+name}/locations',
        request_field='',
        request_type_name=u'DatamigrationProjectsLocationsListRequest',
        response_type_name=u'ListLocationsResponse',
        supports_download=False,
    )

  class ProjectsService(base_api.BaseApiService):
    """Service class for the projects resource."""

    _NAME = u'projects'

    def __init__(self, client):
      super(DatamigrationV1alpha2.ProjectsService, self).__init__(client)
      self._upload_configs = {
          }
